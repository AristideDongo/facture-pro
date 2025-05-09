"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DevisInfo, fullQuoteSchema } from "@/types/quoteSchema";
import { useEffect } from "react";

interface DevisFormProps {
  defaultValues: DevisInfo;
  onSubmit: (data: DevisInfo) => void;
}

export function DevisForm({ defaultValues, onSubmit }: DevisFormProps) {
  const form = useForm<DevisInfo>({
    resolver: zodResolver(fullQuoteSchema),
    defaultValues,
    mode: "onChange",
  });

  // Configurer le fieldArray pour les prestations
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "quoteDetailsSchema.services",
  });

  // Fonction pour ajouter une prestation
  const addPrestation = () => {
    append({ description: "", quantity: 1, unitPrice: 0 });
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = form.handleSubmit((data) => {
    onSubmit(data);
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (form.formState.isValid) {
        onSubmit(value as DevisInfo);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations de l'entreprise */}
        <div className="space-y-4">
          <h3 className="font-medium">Informations de l&apos;entreprise</h3>

          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="compagnyQuoteInfo.compagnyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de l&apos;entreprise</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="compagnyQuoteInfo.compagnyAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="compagnyQuoteInfo.compagnyEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="compagnyQuoteInfo.compagnyPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Informations du client */}
        <div className="space-y-4">
          <h3 className="font-medium">Informations du client</h3>

          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="clientQuoteInfo.clientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du client</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientQuoteInfo.clientAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="clientQuoteInfo.clientEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clientQuoteInfo.clientPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Informations du devis */}
        <div className="space-y-4">
          <h3 className="font-medium">Informations du devis</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="quoteDetailsSchema.quoteNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Numéro de devis</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quoteDetailsSchema.quoteDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date démission</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quoteDetailsSchema.expirationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de validité</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quoteDetailsSchema.taxRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>TVA</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="0.1" min="0" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        {/* Prestations */}
        <div className="space-y-4">
          <h3 className="font-medium">Prestations</h3>

          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name={`quoteDetailsSchema.services.${index}.description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name={`quoteDetailsSchema.services.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantité</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min="1"
                          onChange={(e) =>
                            field.onChange(Number.parseInt(e.target.value) || 1)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name={`quoteDetailsSchema.services.${index}.unitPrice`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix unitaire (€)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          min="0"
                          step="0.01"
                          onChange={(e) =>
                            field.onChange(
                              Number.parseFloat(e.target.value) || 0
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addPrestation}
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" /> Ajouter une prestation
          </Button>
        </div>

        <Separator />

        {/* Conditions de paiement */}
        <FormField
          control={form.control}
          name="quoteDetailsSchema.paymentTerms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conditions de paiement</FormLabel>
              <FormControl>
                <Textarea {...field} rows={2} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="button" className="bg-orange-400 text-black hover:bg-orange-600" onClick={() => handleSubmit()}>
          Aperçu du devis
        </Button>
      </form>
    </Form>
  );
}
