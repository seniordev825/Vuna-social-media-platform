import { FC } from "react";

import { InputGroup, InputLeftElement, Textarea, Text, useColorModeValue } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

import { useField } from 'formik';
import { useAuth } from '../../hooks/useAuth';

type CustomTextareaProps = {
    name: string;
    placeholder: string;
};

import { useLayoutEffect, useRef, useState } from "react";
const MIN_TEXTAREA_HEIGHT = 32;
const MyCustomTextarea:FC<CustomTextareaProps> = (props) => {
    const [field, meta] = useField(props);
    const { currentUser } = useAuth();
    
    const [val, setVal] = useState("")
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useLayoutEffect(() => {
        if (!textareaRef?.current) return
        textareaRef.current.style.height = "inherit";
        textareaRef.current.style.height = `${Math.max(
            textareaRef.current.scrollHeight,
            MIN_TEXTAREA_HEIGHT
        )}px`;
    }, [val]);
    return (
        <>
            <InputGroup>

                <InputLeftElement>
                    <InfoIcon />
                </InputLeftElement>

                <Textarea
                    {...field}
                    {...props}
                    pl={10}
                    isInvalid={meta.touched && !!meta.error}
                    disabled={!currentUser}
                    ref={textareaRef}
                    // onChange={e => setVal(e.target.value)}
                    // value={val}
                     placeholder="Description goes here..."
                />
            </InputGroup>
            {/* <textarea ref={textareaRef}
                onChange={e => setVal(e.target.value)}
                value={val} placeholder="Description goes here..." /> */}
            {
                meta.touched && meta.error &&
                <Text
                    color={useColorModeValue('red.600', 'red.500')}
                    fontSize={'sm'}
                    fontWeight={'semibold'}
                >
                    {meta.error}
                </Text>
            }
        </>

    )
}
export default MyCustomTextarea;
