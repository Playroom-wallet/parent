import { Bitcoin, DollarSign } from "lucide-react"

type TokenIconProps = {
  token: "cBTC" | "USDC"
  className?: string
}

export function TokenIcon({ token, className }: TokenIconProps) {
  return token === "cBTC" ? (
    <div className={`bg-orange-100 text-orange-600 rounded-full p-1 ${className}`}>
      <Bitcoin size={16} />
    </div>
  ) : (
    <div className={`bg-blue-100 text-blue-600 rounded-full p-1 ${className}`}>
      <DollarSign size={16} />
    </div>
  )
}

