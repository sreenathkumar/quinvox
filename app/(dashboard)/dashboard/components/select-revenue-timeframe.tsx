'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { DateRange } from 'react-day-picker';

interface RevenueTimeframeProps {
    selectedRange: DateRange | undefined,
    setSelectedRange: Dispatch<SetStateAction<DateRange | undefined>>
    applyAction: () => void,
    clearAction: () => void
}

function RevenueTimeframe({ selectedRange, setSelectedRange, applyAction, clearAction }: RevenueTimeframeProps) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline'>
                    <CalendarIcon />
                    {
                        selectedRange?.from && selectedRange?.to ?
                            <>
                                {format(selectedRange.from, 'LLL dd, y')} -{' '}
                                {format(selectedRange?.to, 'LLL dd, y')}
                            </>
                            : <span>Pick date range</span>
                    }
                </Button>
            </PopoverTrigger>
            <PopoverContent className='p-0 flex flex-col'>
                <Calendar
                    initialFocus
                    mode='range'
                    defaultMonth={selectedRange?.from}
                    selected={selectedRange}
                    onSelect={setSelectedRange}
                />
                <div className="flex gap-3 pb-3 pr-3 ml-auto mt-4">
                    <Button variant='outline' onClick={clearAction} >Clear</Button>
                    <Button onClick={applyAction}>Apply</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default RevenueTimeframe