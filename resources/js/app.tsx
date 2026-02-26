import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { FlashToaster } from '@/components/FlashToaster';
import { Toaster } from '@/components/ui/sonner';
import '../css/app.css';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  resolve: async (name) => {
    const module = await resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
    );
    const Page = module.default as React.ComponentType<Record<string, unknown>>;
    return {
      default: function AppWithFlash(props: Record<string, unknown>) {
        return (
          <>
            <FlashToaster />
            <Page {...props} />
          </>
        );
      },
    };
  },
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <>
        <App {...props} />
        <Toaster />
      </>
    );
  },
  progress: {
    color: '#4B5563',
  },
});
