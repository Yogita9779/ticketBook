"use client";

import { useEffect, useState } from "react";
import { useAccount } from "@/lib/account-store";

export function useAccountReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const finish = () => setReady(true);
    if (useAccount.persist.hasHydrated()) {
      finish();
      return;
    }
    const unsubscribe = useAccount.persist.onFinishHydration(finish);
    void useAccount.persist.rehydrate();
    return unsubscribe;
  }, []);

  return ready;
}
