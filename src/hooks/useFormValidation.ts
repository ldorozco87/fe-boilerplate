'use client';

import React from 'react';
import { useForm, UseFormProps, FieldValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';

/**
 * Generic form validation hook with internationalization support
 *
 * Features:
 * - Type-safe form handling with Zod validation
 * - Automatic translation integration
 * - Consistent error handling
 * - Reusable across different forms
 */
export function useFormValidation<T extends FieldValues>(
  schema: z.ZodType<T>,
  defaultValues?: UseFormProps<T>['defaultValues'],
  options?: Omit<UseFormProps<T>, 'resolver' | 'defaultValues'>
) {
  const t = useTranslations('FormValidation');

  const form = useForm<T>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    defaultValues,
    mode: 'onBlur', // Validate on blur for better UX
    reValidateMode: 'onChange', // Re-validate on change after first validation
    ...options,
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
    setValue,
    getValues,
    watch,
    trigger,
  } = form;

  // Helper function to get field error message
  const getFieldError = (fieldName: Path<T>): string | undefined => {
    const error = errors[fieldName];
    if (!error) return undefined;

    // If error has a message, return it
    if (typeof error.message === 'string') {
      return error.message;
    }

    // Fallback to generic error message
    return t('genericError');
  };

  // Helper function to check if field has error
  const hasFieldError = (fieldName: Path<T>): boolean => {
    return !!errors[fieldName];
  };

  // Helper function to get field helper text
  const getFieldHelperText = (
    fieldName: Path<T>,
    helperText?: string
  ): string | undefined => {
    const error = getFieldError(fieldName);
    return error || helperText;
  };

  return {
    // Form methods
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    trigger,

    // Form state
    errors,
    isSubmitting,
    isValid,
    isDirty,

    // Helper functions
    getFieldError,
    hasFieldError,
    getFieldHelperText,

    // Raw form object for advanced usage
    form,
  };
}

/**
 * Common validation schemas for reuse
 */
export const commonSchemas = {
  email: (t: (key: string) => string) =>
    z.string().min(1, t('emailRequired')).email(t('emailInvalid')),

  required: (t: (key: string) => string) =>
    z.string().min(1, t('fieldRequired')),

  minLength: (min: number, t: (key: string) => string) =>
    z.string().min(min, t('minLength')),

  maxLength: (max: number, t: (key: string) => string) =>
    z.string().max(max, t('maxLength')),

  phone: (t: (key: string) => string) =>
    z
      .string()
      .min(1, t('phoneRequired'))
      .regex(/^[\+]?[1-9][\d]{0,15}$/, t('phoneInvalid')),

  url: (t: (key: string) => string) =>
    z.string().url(t('urlInvalid')).optional().or(z.literal('')),

  password: (t: (key: string) => string) =>
    z
      .string()
      .min(8, t('passwordMinLength'))
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, t('passwordComplexity')),
};

/**
 * Hook for handling form submission with loading states
 */
export function useFormSubmission<T extends FieldValues>(
  onSubmit: (data: T) => Promise<void> | void,
  options?: {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    successMessage?: string;
    errorMessage?: string;
  }
) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const handleSubmit = async (data: T) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);

      await onSubmit(data);

      setSubmitSuccess(true);
      options?.onSuccess?.();

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : options?.errorMessage || 'An error occurred';

      setSubmitError(errorMessage);
      options?.onError?.(
        error instanceof Error ? error : new Error(errorMessage)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
    submitError,
    submitSuccess,
    clearError: () => setSubmitError(null),
    clearSuccess: () => setSubmitSuccess(false),
  };
}
