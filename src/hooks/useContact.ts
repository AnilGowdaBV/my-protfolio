
import { useMutation } from '@tanstack/react-query';

interface ContactFormData {
    name: string;
    email: string;
    message: string;
    _subject?: string;
    _template?: string;
    _captcha?: string;
    _autoresponse?: string;
}

const submitContactForm = async (data: ContactFormData) => {
    const response = await fetch("https://formsubmit.co/ajax/anilgowda3103@gmail.com", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            ...data,
            _subject: "New Portfolio Contact!",
            _template: "table",
            _captcha: "false",
            _autoresponse: "Thank you for contacting me! I will get back to you shortly."
        })
    });

    if (!response.ok) {
        throw new Error('Transmission failed');
    }

    return response.json();
};

export const useContactMutation = () => {
    return useMutation({
        mutationFn: submitContactForm,
    });
};
