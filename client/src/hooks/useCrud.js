"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useCrud({
  queryKey,
  getAll,
  create,
  update,
  remove,
  restore,
  params = {},
}) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [...queryKey, params],
    queryFn: () => getAll(params),
    keepPreviousData: true,
  });

  const createMutation = useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) =>
      update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: remove,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });

  const restoreMutation = useMutation({
    mutationFn: restore,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey,
      });
    },
  });

  return {
    ...query,

    create: createMutation,

    update: updateMutation,

    remove: deleteMutation,

    restore: restoreMutation,
  };
}