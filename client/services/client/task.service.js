import fetcher from './fetcher.js'

    
    // Task

    const createService = async (authorization, record) => {
        return await fetcher.post('api/task', authorization,  record)
    }
    
    const deleteService = async (authorization, record = { id : 0 }) => {
        return await fetcher.delete(`api/task/${record.id}`, authorization)
    }

    const updateService = async (authorization, record ) => {
        return await fetcher.put(`api/task/${record.id}`, authorization,  record)
    }

    const findManyService = async (authorization) => {
        return await fetcher.get('api/task', authorization)
    }

    module.exports = {
        create: createService,
        delete: deleteService,
        update: updateService,
        findMany: findManyService
    }
