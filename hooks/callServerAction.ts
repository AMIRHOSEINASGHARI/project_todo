"use client";

// react
import { useState } from "react";

const useServerAction = (
  asyncAction: Function,
  afterAction?: Function
): { loading: boolean; fn: Function } => {
  // asyncAction => to calling server action
  // fnInput => the input of server action
  // afterAction => the action we want to be done after the server action is done

  const [loading, setLoading] = useState<boolean>(false);

  const fn = async (fnInput: object) => {
    setLoading(() => true);
    const result = await asyncAction(fnInput);
    setLoading(() => false);

    afterAction && afterAction();
    return result;
  };

  return {
    loading,
    fn,
  };
};

export default useServerAction;
