import { ADMIN, BILLER } from '../constants/constants'
import React from "react"
export const billConfig = {
    path: "/bill",
    view: React.lazy(() => import('../views/GenerateBill')),
    title: "Billing Screen",
    role: [ADMIN, BILLER]


}
export const AuditConfig = {
    path: "/audit",
    view: React.lazy(() => import("../views/Audit")),
    title: "Audit Records",
    role: [ADMIN]
}