import classNames from "classnames";
import { createSearchParams, Link, NavLink } from "react-router-dom";
import path from "src/constants/path";
import { purchaseStatus } from "src/constants/purchase";
import useQueryParams from "src/hooks/useQueryParams";
const purchaseTabs=[
  {status:purchaseStatus.all,
    name:'Tất cả'
  },
  {status:purchaseStatus.waitForConfirmation,
    name:'Chờ xác nhận'
  },
  {status:purchaseStatus.waitForGetting,
    name:'Chờ lấy hàng'
  },
  {status:purchaseStatus.inProgress,
    name:'Đang giao'
  },
  {status:purchaseStatus.delivered,
    name:'Đã giao'
  },
  {status:purchaseStatus.cancelled,
    name:'Đã hủy'
  },
]

export default function HistoryPurchase() {
  const queryParams:{status?:string}=useQueryParams()
  const status:number=Number(queryParams.status)||purchaseStatus.all
  const purchaseTabsLink=purchaseTabs.map(tab=>(
    <NavLink key={tab.status} to={{pathname:path.historyPurchase,search:createSearchParams({
      status:String(tab.status)
    }).toString()}} className={
      classNames('flex flex-1 items-center justify-center border-b bg-white py-4 text-center', {
        'border-b-orange text-orange': status===tab.status,  // Sử dụng isActive trực tiếp
        'border-b-black/10 text-gray-900': status!==tab.status // Khi không phải là active thì dùng 'text-gray-600'
      })
    }>
      {tab.name}
    </NavLink>
  ))
  return (
  <div>
    <div className="sticky top-0 flex rounded-top-sm shadow-sm">
    {purchaseTabsLink}
  </div>
  <div>
      <div className="mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm">
        <Link to={'/'} className="flex">
          Sản phẩm
        </Link>
      </div>
  </div>
  </div>
  )
}
