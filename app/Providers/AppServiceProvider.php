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
        $this->fixNeonEndpointId();
        $this->fixPgsqlOptions();
        $this->configureDefaults();

        if (env('APP_ENV') === 'production') {
            $url->forceScheme('https');
        }
    }

    /**
     * Add Neon endpoint ID to DB_URL for environments (e.g. Vercel) with older libpq
     * that lacks SNI support. Required by Neon to route connections.
     */
    protected function fixNeonEndpointId(): void
    {
        $url = Config::get('database.connections.pgsql.url');

        if (! $url || ! str_contains($url, 'neon.tech') || str_contains($url, 'options=endpoint')) {
            return;
        }

        $parsed = parse_url($url);
        $host = $parsed['host'] ?? null;

        if (! $host) {
            return;
        }

        $endpointId = explode('.', $host, 2)[0];
        $separator = isset($parsed['query']) ? '&' : '?';
        $options = 'options=endpoint%3D'.urlencode($endpointId);

        Config::set('database.connections.pgsql.url', $url.$separator.$options);
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
