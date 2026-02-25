import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AuthController::createLogin
* @see app/Http/Controllers/AuthController.php:13
* @route '/login'
*/
export const createLogin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createLogin.url(options),
    method: 'get',
})

createLogin.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AuthController::createLogin
* @see app/Http/Controllers/AuthController.php:13
* @route '/login'
*/
createLogin.url = (options?: RouteQueryOptions) => {
    return createLogin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::createLogin
* @see app/Http/Controllers/AuthController.php:13
* @route '/login'
*/
createLogin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: createLogin.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AuthController::createLogin
* @see app/Http/Controllers/AuthController.php:13
* @route '/login'
*/
createLogin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: createLogin.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AuthController::createLogin
* @see app/Http/Controllers/AuthController.php:13
* @route '/login'
*/
const createLoginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createLogin.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AuthController::createLogin
* @see app/Http/Controllers/AuthController.php:13
* @route '/login'
*/
createLoginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createLogin.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\AuthController::createLogin
* @see app/Http/Controllers/AuthController.php:13
* @route '/login'
*/
createLoginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: createLogin.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

createLogin.form = createLoginForm

/**
* @see \App\Http\Controllers\AuthController::storeLogin
* @see app/Http/Controllers/AuthController.php:18
* @route '/login'
*/
export const storeLogin = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLogin.url(options),
    method: 'post',
})

storeLogin.definition = {
    methods: ["post"],
    url: '/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AuthController::storeLogin
* @see app/Http/Controllers/AuthController.php:18
* @route '/login'
*/
storeLogin.url = (options?: RouteQueryOptions) => {
    return storeLogin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::storeLogin
* @see app/Http/Controllers/AuthController.php:18
* @route '/login'
*/
storeLogin.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeLogin.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AuthController::storeLogin
* @see app/Http/Controllers/AuthController.php:18
* @route '/login'
*/
const storeLoginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeLogin.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AuthController::storeLogin
* @see app/Http/Controllers/AuthController.php:18
* @route '/login'
*/
storeLoginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: storeLogin.url(options),
    method: 'post',
})

storeLogin.form = storeLoginForm

/**
* @see \App\Http\Controllers\AuthController::destroy
* @see app/Http/Controllers/AuthController.php:27
* @route '/logout'
*/
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: destroy.url(options),
    method: 'post',
})

destroy.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AuthController::destroy
* @see app/Http/Controllers/AuthController.php:27
* @route '/logout'
*/
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AuthController::destroy
* @see app/Http/Controllers/AuthController.php:27
* @route '/logout'
*/
destroy.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: destroy.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AuthController::destroy
* @see app/Http/Controllers/AuthController.php:27
* @route '/logout'
*/
const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\AuthController::destroy
* @see app/Http/Controllers/AuthController.php:27
* @route '/logout'
*/
destroyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(options),
    method: 'post',
})

destroy.form = destroyForm

const AuthController = { createLogin, storeLogin, destroy }

export default AuthController