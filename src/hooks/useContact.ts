
import { useMutation } from '@tanstack/react-query';

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

const submitContactForm = async (data: ContactFormData) => {
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(data),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
        const msg =
            typeof (payload as { error?: string }).error === 'string'
                ? (payload as { error: string }).error
                : 'Transmission failed';
        throw new Error(msg);
    }

    return payload;
};

export const useContactMutation = () => {
    return useMutation({
        mutationFn: submitContactForm,
    });
};
