var APIConfig = {
    development: 'http://localhost:8888/',
    production: 'local:8888'
}

export default APIConfig[process.env.NODE_ENV]