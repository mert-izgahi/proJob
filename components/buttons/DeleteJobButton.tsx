import { deleteJob } from "@/utils/actions";
import { Button } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { IoTrash } from "react-icons/io5";

function DeleteJobButton({ id }: { id: string }) {
    const { mutate, isPending } = useMutation({
        mutationKey: ["deleteJob", id],
        mutationFn: async (id: string) => {
            if (!id) return null;
            return await deleteJob(id);
        },
        onSuccess: (data) => {
            if (!data) return;
            queryClient.invalidateQueries({
                queryKey: ["jobs"],
            });
            queryClient.invalidateQueries({
                queryKey: ["stats"],
            });
            queryClient.invalidateQueries({
                queryKey: ["charts"],
            });
        },
    });
    const queryClient = useQueryClient();
    const handleDelete = () => {
        mutate(id);
    };
    return (
        <Button
            variant="outline"
            leftSection={<IoTrash />}
            fullWidth
            onClick={handleDelete}
            disabled={isPending}
            loading={isPending}
        >
            Remove
        </Button>
    );
}

export default DeleteJobButton;
