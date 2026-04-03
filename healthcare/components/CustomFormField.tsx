import React from 'react'
import { E164Number } from "libphonenumber-js/core";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface CustomProps {
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: any) => React.ReactNode;
    fieldType: FormFieldType;
}


const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
    const { fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton } = props; //destructure props

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-none border-4 border-black bg-white shadow-neo">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            height={24}
                            width={24}
                            alt={iconAlt || "icon"}
                            className="ml-2 brightness-0"
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className="shad-input border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-dark-600/50"
                        />
                    </FormControl>
                </div>
            );

        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry="NZ"
                        placeholder={placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className="input-phone border-4 border-black bg-white shadow-neo px-3 h-11"
                    />
                </FormControl>
            );

        case FormFieldType.DATE_PICKER:
            return (
                <div className="flex rounded-none border-4 border-black bg-white shadow-neo">
                    <Image
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt="user"
                        className="ml-2 brightness-0"
                    />
                    <FormControl>
                        <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat={dateFormat ?? "dd/MM/yyyy"}
                            showTimeSelect={showTimeSelect ?? false}
                            timeInputLabel="Time:"
                            wrapperClassName="date-picker"
                            className="bg-transparent border-0 outline-none text-black h-11 px-3 w-full font-bold"
                        />
                    </FormControl>
                </div>
            );

        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="shad-select-trigger border-4 border-black bg-white shadow-neo rounded-none h-11">
                                <SelectValue placeholder={placeholder} className="placeholder:text-dark-600/50" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="shad-select-content border-4 border-black bg-white rounded-none shadow-neo-lg">
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            );

        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        placeholder={props.placeholder}
                        {...field}
                        className="shad-textArea border-4 border-black bg-white shadow-neo rounded-none"
                        disabled={props.disabled}
                    />
                </FormControl>
            );

        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className="flex items-center gap-4">
                        <Checkbox
                            id={props.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-3 border-black size-6 data-[state=checked]:bg-neo-secondary rounded-none"
                        />
                        <label htmlFor={props.name} className="checkbox-label font-bold text-black cursor-pointer">
                            {props.label}
                        </label>
                    </div>
                </FormControl>
            );

        case FormFieldType.SKELETON:
            return (
                renderSkeleton ? renderSkeleton(field) : null
            );


        default:
            break;
    }
}

const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, label } = props; //destructure props

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel className="font-black text-black uppercase tracking-wider">{label}</FormLabel>
                    )}

                    <RenderField field={field} props={props} />

                    <FormMessage className="shad-error font-bold" />
                </FormItem>
            )}
        />
    )
}

export default CustomFormField