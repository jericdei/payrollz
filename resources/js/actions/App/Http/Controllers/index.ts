import DashboardController from './DashboardController'
import EmployeeController from './EmployeeController'
import AuthController from './AuthController'

const Controllers = {
    DashboardController: Object.assign(DashboardController, DashboardController),
    EmployeeController: Object.assign(EmployeeController, EmployeeController),
    AuthController: Object.assign(AuthController, AuthController),
}

export default Controllers