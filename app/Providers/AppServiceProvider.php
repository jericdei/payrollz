<?php

namespace App\Providers;

use Carbon\CarbonImmutable;
use Illuminate\Routing\UrlGenerator;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Pdo\Pgsql;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(UrlGenerator $url): void
    {
        $this->fixPgsqlOptions();
        $this->configureDefaults();

        if (env('APP_ENV') === 'production') {
            $url->forceScheme('https');
            $this->fixNeonEndpointId();
        }
    }

    /**
     * Add Neon endpoint ID to DB_URL for environments (e.g. Vercel) with older libpq
     * that lacks SNI support. Uses the password-based workaround to avoid colliding
     * with Laravel's PDO options array (which expects ?options= to be an array).
     */
    protected function fixNeonEndpointId(): void
    {
        $url = Config::get('database.connections.pgsql.url');

        if (! $url || ! str_contains($url, 'neon.tech') || str_contains($url, 'endpoint=')) {
            return;
        }

        $parsed = parse_url($url);
        $host = $parsed['host'] ?? null;
        $user = $parsed['user'] ?? '';
        $pass = $parsed['pass'] ?? '';

        if (! $host || ! $pass) {
            return;
        }

        $endpointId = explode('.', $host, 2)[0];
        $passWithEndpoint = 'endpoint='.$endpointId.';'.$pass;

        $scheme = $parsed['scheme'] ?? 'postgresql';
        $port = isset($parsed['port']) ? ':'.$parsed['port'] : '';
        $path = $parsed['path'] ?? '/';
        $query = isset($parsed['query']) ? '?'.$parsed['query'] : '';
        $newUrl = $scheme.'://'.$user.':'.rawurlencode($passWithEndpoint).'@'.$host.$port.$path.$query;

        Config::set('database.connections.pgsql.url', $newUrl);
    }

    /**
     * Ensure pgsql options is always an array. DB_URL query params (e.g. ?options=...)
     * can overwrite our config with a string, causing array_diff_key() to fail.
     */
    protected function fixPgsqlOptions(): void
    {
        $options = Config::get('database.connections.pgsql.options');

        if (! is_array($options)) {
            Config::set('database.connections.pgsql.options', [
                Pgsql::ATTR_DISABLE_PREPARES => true,
            ]);
        } elseif (! isset($options[Pgsql::ATTR_DISABLE_PREPARES])) {
            Config::set('database.connections.pgsql.options', $options + [
                Pgsql::ATTR_DISABLE_PREPARES => true,
            ]);
        }
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
