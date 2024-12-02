export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export class ContactFormValidation {
    static validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static validate(data: ContactFormData): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];

        if (!data.name || data.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }

        if (!data.email || !this.validateEmail(data.email)) {
            errors.push('Please provide a valid email address');
        }

        if (!data.subject || data.subject.trim().length < 3) {
            errors.push('Subject must be at least 3 characters long');
        }

        if (!data.message || data.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}
