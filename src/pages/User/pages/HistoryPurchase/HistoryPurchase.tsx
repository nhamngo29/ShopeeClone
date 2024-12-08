import { useQuery } from "@tanstack/react-query";
import classNames from "classnames";
import { createSearchParams, Link, NavLink } from "react-router-dom";
import orderApi from "src/apis/order.api";
import path from "src/constants/path";
import { purchaseStatus } from "src/constants/purchase";
import useQueryParams from "src/hooks/useQueryParams";
import { OrderStatus } from "src/types/orderStatus.type";
import { formatCurrency, generateNameId } from "src/utils/utils";
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
  console.log(status)
  const {data:purchasessInCartData}=useQuery({
    
    queryKey:['order',{status}],
    queryFn:()=>orderApi.getOrder({status:status as OrderStatus})
  })
  const orderItemsList=purchasessInCartData?.data.response
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
      {
        orderItemsList?.map(orderItems=>(
          orderItems.items.map(orderItem=>(
            <div key={orderItem.productId} className="mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm">
              <Link to={`${path.home}${generateNameId({ name: orderItem.name, id: orderItem.productId })}`} className="flex">
                <div className="flex-shrink-0">
                  <img className="h-20 w-20 object-cover"src={orderItem.image} alt={orderItem.name}/>
                </div>
                <div className="ml-3 flex-grow overflow-hidden"><div className="truncate">
                {orderItem.name}
                  </div>
                  <div className="mt-3">x{orderItem.quantity}</div>
                  </div>
                  <div className="ml-3 flex-shrink-0">
                    <span className="truncate text-gray-500 line-through">
                    đ{formatCurrency(orderItem.price)}
                    </span>
                    <span className="truncate text-orange ml-2">
                    đ{formatCurrency(orderItem.price)}
                    </span>
                  </div>
              </Link>
              <div className="flex justify-end">
                <div>
                  <span>Tổng giá tiền</span>
                  <span className="text-lg text-orange ml-2">
                    đ{formatCurrency(orderItem.priceBuy*orderItem.quantity)}
                    </span>
                  </div>
              </div>
            </div>
          ))
        ))
      }
  </div>
  </div>
  )
}
