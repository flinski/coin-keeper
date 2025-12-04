import { useMutation, useQueryClient } from '@tanstack/react-query'
import { editCategory as editCategoryApi } from '@/services/apiCategories'

export function useEditCategory() {
	const queryClient = useQueryClient()

	const { mutate: editCategory, isPending: isLoading } = useMutation({
		mutationFn: editCategoryApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] })
		},
	})

	return { editCategory, isLoading }
}
