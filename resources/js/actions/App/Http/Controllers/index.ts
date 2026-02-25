import EmployeeController from './EmployeeController'
import AuthController from './AuthController'

const Controllers = {
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    AuthController: Object.assign(AuthController, AuthController),
}

export default Controllers