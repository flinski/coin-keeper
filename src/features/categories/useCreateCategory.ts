import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategory as createCategoryApi } from '@/services/apiCategories'

export function useCreateCategory() {
	const queryClient = useQueryClient()

	const { mutate: createCategory, isPending: isLoading } = useMutation({
		mutationFn: createCategoryApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['categories'] })
		},
	})

	return { createCategory, isLoading }
}
