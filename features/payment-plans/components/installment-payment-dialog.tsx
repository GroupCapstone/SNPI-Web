'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { formatCurrency } from '@/lib/formatters';
import { usePayInstallmentMutation } from '../hooks/use-payment-plans';
import { installmentPaymentSchema } from '../schemas/payment-plan-schema';
import type { PaymentPlan } from '../types';

export const InstallmentPaymentDialog = ({
  plan,
  onClose,
}: {
  plan: PaymentPlan;
  onClose: () => void;
}) => {
  const installment = plan.installments.find((item) => item.status !== 'paid');
  const mutation = usePayInstallmentMutation();
  const [method, setMethod] = useState('cash');
  const [date, setDate] = useState(new Date().toLocaleDateString('en-CA'));
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');
  if (!installment) return null;

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open && !mutation.isPending) onClose();
      }}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Record installment payment</DialogTitle>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            const parsed = installmentPaymentSchema.safeParse({
              paymentMethod: method,
              paymentDate: date,
              transactionReference: reference || undefined,
            });
            if (!parsed.success) {
              setError(parsed.error.issues[0].message);
              return;
            }
            try {
              const result = await mutation.mutateAsync({
                id: plan._id,
                sequence: installment.sequence,
                input: parsed.data,
              });
              toast.success(`Payment recorded: ${result.data.payment.receiptNumber}`);
              onClose();
            } catch (failure) {
              setError(failure instanceof Error ? failure.message : 'Unable to record payment');
            }
          }}
        >
          <p className="text-sm leading-5">
            Installment {installment.sequence}:{' '}
            <strong>
              {formatCurrency(installment.amount - installment.paidAmount, plan.currency)}
            </strong>
          </p>
          <label className="block space-y-1 text-xs leading-5 font-semibold">
            Payment method
            <Select value={method} onChange={(event) => setMethod(event.target.value)}>
              <option value="cash">Cash</option>
              <option value="aba_pay">ABA Pay</option>
              <option value="bank_transfer">Bank transfer</option>
              <option value="credit_card">Credit card</option>
              <option value="wing">Wing</option>
            </Select>
          </label>
          <label className="block space-y-1 text-xs leading-5 font-semibold">
            Payment date
            <Input
              type="date"
              required
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>
          <label className="block space-y-1 text-xs leading-5 font-semibold">
            Transaction reference
            <Input
              value={reference}
              maxLength={200}
              onChange={(event) => setReference(event.target.value)}
            />
          </label>
          {error && (
            <p role="alert" className="text-xs leading-5 font-medium text-rose-600">
              {error}
            </p>
          )}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" disabled={mutation.isPending} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Recording...' : 'Record payment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
