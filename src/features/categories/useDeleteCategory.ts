import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCategory as deleteCategoryApi } from '@/services/apiCategories'

export function useDeleteCategory() {
	const queryClient = useQueryClient()

	const { mutate: deleteCategory, isPending: isLoading } = useMutation({
		mutationFn: deleteCategoryApi,
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['categories'],
			})
		},
	})

	return { deleteCategory, isLoading }
}
