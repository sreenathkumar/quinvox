import { describe, test, expect } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import SingleItem from './SingleItem';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

//default values for the form
const defaultValues = {
    items: [{
        description: 'test item',
        quantity: 10,
        unit_price: 50,
    }]
};

function Wrapper() {
    const form = useForm<any>({
        defaultValues
    });

    return <FormProvider {...form}><SingleItem form={form} index={0} onRemove={() => console.log('remove')} /></FormProvider>
}

describe('Test: Single Item', () => {
    test('renders Single Item component', () => {
        render(<Wrapper />)

        const des = screen.getByLabelText('Description');
        const qty = screen.getByLabelText('Quantity');
        const price = screen.getByLabelText('Price');
        expect(des).toBeDefined();
        expect(qty).toBeDefined();
        expect(price).toBeDefined();

    });

    test('updating price calculation', () => {
        const itemPrice = screen.getByLabelText('item_price');
        expect(itemPrice.textContent).toBe('$500.00');

        const qty = screen.getByLabelText('Quantity') as HTMLInputElement;
        fireEvent.change(qty, { target: { value: "2" } })
        expect(itemPrice.textContent).toBe('$100.00');

        const price = screen.getByLabelText('Price') as HTMLInputElement;
        fireEvent.change(price, { target: { value: "20" } })
        expect(itemPrice.textContent).toBe('$40.00');
    })

    test('can\'t set negative/0 quantity', () => {

        const qty = screen.getByLabelText('Quantity') as HTMLInputElement;

        //try setting negative quantity
        fireEvent.change(qty, { target: { value: "-1" } })
        expect(qty.validity.valid).toBe(false);

        //try setting zero quantity
        fireEvent.change(qty, { target: { value: "0" } })
        expect(qty.validity.valid).toBe(false);
    });
});