"use client";

import { useState } from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useInvoiceForm } from "@/hooks/invoices/useInvoiceForm";
import { InvoicePreview } from "../InvoicePreview";

export function InvoiceForm() {
  const {
    form,
    taxRate,
    handleSubmit,
    calculateSubtotal,
    calculateTax,
    calculateTotal,
    handleAddItem,
    handleRemoveItem,
    isPreviewOpen,
    invoiceData,
    handleClosePreview,
    handleDownloadPDF,
  } = useInvoiceForm();

  const {
    control,
    register,
    watch,
    formState: { errors },
  } = form;

  const { fields } = useFieldArray({
    control,
    name: "items",
  });

  // Observer les articles pour calculer les totaux
  const items = watch("items");
  const subtotal = calculateSubtotal(items);
  const tax = calculateTax(subtotal, taxRate);
  const total = calculateTotal(subtotal, tax);

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">
              Informations de l'entreprise
            </h2>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="compagnyName">Nom de l'entreprise</Label>
                <Input
                  id="compagnyName"
                  placeholder="Nom du client"
                  {...register('compagnyName')}
                  aria-invalid={errors.compagnyName ? "true" : "false"}
                />
                {errors.compagnyName && (
                  <p className="text-sm text-red-500">
                    {errors.compagnyName.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="compagnyEmail">Email</Label>
                <Input
                  id="compagnyEmail"
                  type="email"
                  placeholder="compagny@example.com"
                  {...register('compagnyEmail')}
                  aria-invalid={errors.compagnyEmail ? "true" : "false"}
                />
                {errors.compagnyEmail && (
                  <p className="text-sm text-red-500">
                    {errors.compagnyEmail.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="compagnyAddress">Adresse</Label>
                <Textarea
                  id="compagnyAddress"
                  placeholder="Adresse complète"
                  {...register("compagnyAddress")}
                  aria-invalid={errors.compagnyAddress ? "true" : "false"}
                />
                {errors.compagnyAddress && (
                  <p className="text-sm text-red-500">
                    {errors.compagnyAddress.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="compagnyPhone">Numéro de téléphone</Label>
                <Input
                  id="compagnyPhone"
                  placeholder="XXXXXXXX"
                  {...register("compagnyPhone")}
                  aria-invalid={errors.compagnyPhone ? "true" : "false"}
                />
                {errors.compagnyPhone && (
                  <p className="text-sm text-red-500">
                    {errors.compagnyPhone.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid mt-8 gap-8 md:grid-cols-2">
          {/* Informations de la facture */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">
                Informations de la facture
              </h2>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="invoiceNumber">Numéro de facture</Label>
                  <Input
                    id="invoiceNumber"
                    {...register("invoiceNumber")}
                    aria-invalid={errors.invoiceNumber ? "true" : "false"}
                  />
                  {errors.invoiceNumber && (
                    <p className="text-sm text-red-500">
                      {errors.invoiceNumber.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="invoiceDate">Date de facture</Label>
                  <Input
                    id="invoiceDate"
                    type="date"
                    {...register("invoiceDate")}
                    aria-invalid={errors.invoiceDate ? "true" : "false"}
                  />
                  {errors.invoiceDate && (
                    <p className="text-sm text-red-500">
                      {errors.invoiceDate.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Date d'échéance</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    {...register("dueDate")}
                    aria-invalid={errors.dueDate ? "true" : "false"}
                  />
                  {errors.dueDate && (
                    <p className="text-sm text-red-500">
                      {errors.dueDate.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="taxRate">Taux de TVA (%)</Label>
                  <Controller
                    name="taxRate"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value.toString()}
                        onValueChange={(value) => field.onChange(Number(value))}
                      >
                        <SelectTrigger id="taxRate">
                          <SelectValue placeholder="Sélectionnez un taux" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0%</SelectItem>
                          <SelectItem value="5.5">5.5%</SelectItem>
                          <SelectItem value="10">10%</SelectItem>
                          <SelectItem value="20">20%</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations du client */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">
                Informations du client
              </h2>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="clientName">Nom du client</Label>
                  <Input
                    id="clientName"
                    placeholder="Nom du client ou de l'entreprise"
                    {...register("clientName")}
                    aria-invalid={errors.clientName ? "true" : "false"}
                  />
                  {errors.clientName && (
                    <p className="text-sm text-red-500">
                      {errors.clientName.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="clientEmail">Email</Label>
                  <Input
                    id="clientEmail"
                    type="email"
                    placeholder="client@example.com"
                    {...register("clientEmail")}
                    aria-invalid={errors.clientEmail ? "true" : "false"}
                  />
                  {errors.clientEmail && (
                    <p className="text-sm text-red-500">
                      {errors.clientEmail.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="clientAddress">Adresse</Label>
                  <Textarea
                    id="clientAddress"
                    placeholder="Adresse complète"
                    {...register("clientAddress")}
                    aria-invalid={errors.clientAddress ? "true" : "false"}
                  />
                  {errors.clientAddress && (
                    <p className="text-sm text-red-500">
                      {errors.clientAddress.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                <Label htmlFor="clientPhone">Numéro de téléphone</Label>
                <Input
                  id="clientPhone"
                  placeholder="XXXXXXXX"
                  {...register('clientPhone')}
                  aria-invalid={errors.clientPhone ? "true" : "false"}
                />
                {errors.clientPhone && (
                  <p className="text-sm text-red-500">
                    {errors.clientPhone.message}
                  </p>
                )}
              </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Articles de la facture */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4">Articles</h2>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid gap-4 p-4 border rounded-md mb-4"
              >
                <div className="grid gap-2">
                  <Label htmlFor={`items.${index}.description`}>
                    Description
                  </Label>
                  <Input
                    id={`items.${index}.description`}
                    {...register(`items.${index}.description`)}
                    placeholder="Description de l'article ou du service"
                    aria-invalid={
                      errors.items?.[index]?.description ? "true" : "false"
                    }
                  />
                  {errors.items?.[index]?.description && (
                    <p className="text-sm text-red-500">
                      {errors.items[index]?.description?.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor={`items.${index}.quantity`}>Quantité</Label>
                    <Input
                      id={`items.${index}.quantity`}
                      type="number"
                      min="1"
                      {...register(`items.${index}.quantity`, {
                        valueAsNumber: true,
                      })}
                      aria-invalid={
                        errors.items?.[index]?.quantity ? "true" : "false"
                      }
                    />
                    {errors.items?.[index]?.quantity && (
                      <p className="text-sm text-red-500">
                        {errors.items[index]?.quantity?.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`items.${index}.price`}>
                      Prix unitaire (€)
                    </Label>
                    <Input
                      id={`items.${index}.price`}
                      type="number"
                      min="0"
                      step="0.01"
                      {...register(`items.${index}.price`, {
                        valueAsNumber: true,
                      })}
                      aria-invalid={
                        errors.items?.[index]?.price ? "true" : "false"
                      }
                    />
                    {errors.items?.[index]?.price && (
                      <p className="text-sm text-red-500">
                        {errors.items[index]?.price?.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`items.${index}.total`}>Total (€)</Label>
                    <Input
                      id={`items.${index}.total`}
                      type="number"
                      value={(
                        (items[index]?.quantity || 0) *
                        (items[index]?.price || 0)
                      ).toFixed(2)}
                      disabled
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="ml-auto"
                  onClick={() => handleRemoveItem(index)}
                  disabled={fields.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Supprimer l'article</span>
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full mb-6"
              onClick={handleAddItem}
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un article
            </Button>

            {/* Totaux */}
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between">
                <span>Sous-total:</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>TVA ({taxRate}%):</span>
                <span>{tax.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-primary">{total.toFixed(2)} €</span>
              </div>
            </div>

            {/* Notes */}
            <div className="grid gap-2 mt-6">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Conditions de paiement, notes supplémentaires..."
                {...register("notes")}
              />
            </div>
          </CardContent>
        </Card>

        {/* Boutons d'action */}
        <div className="flex justify-end gap-4 mt-8">
          <Link href="/dashboard/invoices">
            <Button type="button" variant="outline">
              Annuler
            </Button>
          </Link>
          <Button
            type="submit"
            className="bg-orange-400 text-black hover:bg-orange-500"
          >
            Enregistrer la facture
          </Button>
        </div>
      </form>

      {/* Modal d'aperçu de la facture */}
      {isPreviewOpen && invoiceData && (
        <InvoicePreview
        invoiceData={invoiceData}
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        onDownload={handleDownloadPDF}
      />
      )}
    </FormProvider>
  );
}
