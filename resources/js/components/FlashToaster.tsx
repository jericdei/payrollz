import { usePage } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface FlashProps {
  success?: string;
  error?: string;
  warning?: string;
}

export function FlashToaster() {
  const { flash } = usePage().props as { flash?: FlashProps };
  const prevFlash = useRef<FlashProps | null>(null);

  useEffect(() => {
    if (!flash || flash === prevFlash.current) return;

    if (flash.success) {
      toast.success(flash.success);
    }
    if (flash.error) {
      toast.error(flash.error);
    }
    if (flash.warning) {
      toast.warning(flash.warning);
    }

    prevFlash.current = flash;
  }, [flash]);

  return null;
}
