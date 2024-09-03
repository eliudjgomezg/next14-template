import { ApiVersionEnum } from "definitions/enums/globals"
import { Example } from "definitions/types/Example"
import { apiClient } from "utils/ApiClient"

const baseName = `${ApiVersionEnum.V1}/examples`
const endpoints = {
  example: `${baseName}/example`,
}

export const fetchTenant = async (id: string) => {

  try {
    const endpoint = endpoints.example
    return await apiClient.get<Example>({ endpoint })
  } catch (error) {
    throw new Error('Failed to fetch data.')
  }
}