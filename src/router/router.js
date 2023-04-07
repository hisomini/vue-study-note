import Login from '@/components/LoginPage'
import Myinfo from '@/components/MyinfoPage'
import Templates from '@/components/TemplateList'
import TemplateDetail from '@/components/TemplateDetail'
import TemplateEdit from '@/components/TemplateEdit'
import TemplateAdd from '@/components/TemplateAdd'
import Documents from '@/components/DocumentList'
import DocumentDetail from '@/components/DocumentDetail'
import DocumentEdit from '@/components/DocumentEdit'
import DocumentAdd from '@/components/DocumentAdd'
import Employees from '@/components/EmployeeList'
import EmployeeAdd from '@/components/EmployeeAdd'
import ApprovalLines from '@/components/ApprovalLineList'
import VueRouter from "vue-router"


let router = new VueRouter({
    // mode: 'history',
    routes: [
        {
    
            path: '/login',
            name:'login',
            component : Login
        },
        {
            path: '', 
            name: 'main',
            component: Login
        },
        {
            path: '/myinfo',
            name: 'myinfo',
            component: Myinfo
        },
        {
            path: '/templates',
            name: 'templates',
            component: Templates
        },
        {
            path: '/templates/:id',
            name: 'templateDetail',
            props: true,
            component: TemplateDetail
        },
        {
            path: '/templates/edit/:id',
            name: 'templateEdit',
            props: true,
            component: TemplateEdit
        },
        {
            path: '/template/add',
            name: 'templateAdd',
            component: TemplateAdd
        },
        {
            path: '/documents',
            name: 'documents',
            component: Documents

        },
        {
            path: '/documents/:id',
            name: 'documentDetail',
            props: true,
            component: DocumentDetail
        },
        {
            path: '/document/edit/:id',
            name: 'documentEdit',
            props: true,
            component: DocumentEdit
        },
        {
            path: '/document/add',
            name: 'documentAdd',
            props: true,
            component: DocumentAdd
        },
        {
            path: '/employees',
            name: 'employees',
            component: Employees
        },
        {
            path: '/employee/add',
            name: 'employeeAdd',
            props: true,
            component: EmployeeAdd
        },
        {
            path: '/approvalLines', 
            name: 'approvalLines',
            component: ApprovalLines
        }
    ],
});

export default router