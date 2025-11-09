import React from 'react'

function TableRowItem({ description, quantity, rate, amount }: { description: string; quantity: number; rate: string; amount: string }) {
    return (
        <tr>
            <td className="py-4 px-0 text-sm font-semibold text-gray-900">{description}</td>
            <td className="py-4 px-4 text-right text-sm font-semibold text-gray-900">{quantity}</td>
            <td className="py-4 px-4 text-right text-sm font-semibold text-gray-900">{rate}</td>
            <td className="py-4 px-0 text-right text-sm font-semibold text-gray-900">{amount}</td>
        </tr>
    )
}

export default TableRowItem