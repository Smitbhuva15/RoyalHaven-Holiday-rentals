"use client"

export async function getHome() {
   
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error, isLoading } = useSWR(`/api/home`, fetcher)

    return data
}
