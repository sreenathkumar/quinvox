import { fireEvent, render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { describe, expect, test } from 'vitest';
import ItemsInfo from './ItemsInfo';

//default values for the form
const defaultValues = {
    items: [{
        description: 'test item',
        quantity: 10,
        unit_price: 50,
    }]
};

//mocking a wrapper to provide form context
function ItemsWrapper() {
    const form = useForm<any>({
        defaultValues
    });

    return <FormProvider {...form}><ItemsInfo form={form} /></FormProvider>
}

describe('ItemsInfo Component', () => {
    test('render the component', () => {
        render(<ItemsWrapper />);

        //check default item is rendered
        expect(screen.getByLabelText('Description')).toBeDefined();
        expect(screen.getByLabelText('Quantity')).toBeDefined();
        expect(screen.getByLabelText('Price')).toBeDefined();
        expect(screen.getByLabelText('item_price').textContent).toBe('$500.00');
        expect(screen.getByRole('button', { name: /remove-item/i })).toBeDefined();

        expect(screen.getByRole('button', { name: /add item/i })).toBeDefined();
    });

    test('add and remove item functionality', () => {
        render(<ItemsWrapper />);
        const addButton = screen.getByRole('button', { name: /add item/i });
        const removeButton = screen.getByRole('button', { name: /remove-item/i });

        //add item
        fireEvent.click(addButton);
        const descriptionFields = screen.getAllByLabelText('Description');
        expect(descriptionFields.length).toBe(2); //two items should be present now

        //remove item
        fireEvent.click(removeButton);
        const updatedDescriptionFields = screen.getAllByLabelText('Description');
        expect(updatedDescriptionFields.length).toBe(1); //one item should be present now
    });
});