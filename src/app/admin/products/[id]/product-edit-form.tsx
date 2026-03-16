"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { productFormSchema, type ProductFormValues } from "@/lib/validations/product";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  slug: string;
  category: "tee" | "hat";
  status: "draft" | "active" | "archived";
  featured: boolean;
  description: string;
  shortDescription: string | null;
  material: string | null;
  fitNote: string | null;
  shippingNote: string | null;
  careInstructions: string | null;
  collection: string | null;
};

export function ProductEditForm({ product }: { product: Product }) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema) as Resolver<ProductFormValues>,
    defaultValues: {
      name: product.name,
      slug: product.slug,
      category: product.category,
      status: product.status,
      featured: product.featured,
      description: product.description,
      shortDescription: product.shortDescription ?? undefined,
      material: product.material ?? undefined,
      fitNote: product.fitNote ?? undefined,
      shippingNote: product.shippingNote ?? undefined,
      careInstructions: product.careInstructions ?? undefined,
      collection: product.collection ?? undefined,
    },
  });

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;
    setValue("name", name);
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    setValue("slug", slug);
  }

  async function onSubmit(data: ProductFormValues) {
    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/products");
    } else {
      const json = await res.json();
      alert(json.error ?? "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-1.5">Name</label>
        <Input
          {...register("name")}
          onChange={handleNameChange}
          placeholder="Product name"
          className="rounded-2xl"
        />
        {errors.name && (
          <p className="text-destructive text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Slug</label>
        <Input
          {...register("slug")}
          placeholder="product-slug"
          className="rounded-2xl"
        />
        {errors.slug && (
          <p className="text-destructive text-xs mt-1">{errors.slug.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Category</label>
          <select
            {...register("category")}
            className="h-8 w-full rounded-2xl border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring"
          >
            <option value="tee">Tee</option>
            <option value="hat">Hat</option>
          </select>
          {errors.category && (
            <p className="text-destructive text-xs mt-1">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Status</label>
          <select
            {...register("status")}
            className="h-8 w-full rounded-2xl border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
          {errors.status && (
            <p className="text-destructive text-xs mt-1">{errors.status.message}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="featured"
          {...register("featured")}
          className="h-4 w-4 rounded"
        />
        <label htmlFor="featured" className="text-sm font-medium">
          Featured
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">Description</label>
        <Textarea
          {...register("description")}
          placeholder="Product description"
          className="rounded-2xl"
        />
        {errors.description && (
          <p className="text-destructive text-xs mt-1">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Short Description{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <Input
          {...register("shortDescription")}
          placeholder="Brief product summary"
          className="rounded-2xl"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Material{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <Input
          {...register("material")}
          placeholder="e.g. 100% cotton"
          className="rounded-2xl"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Fit Note{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <Input
          {...register("fitNote")}
          placeholder="e.g. Runs slightly large"
          className="rounded-2xl"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Shipping Note{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <Input
          {...register("shippingNote")}
          placeholder="e.g. Ships in 3-5 business days"
          className="rounded-2xl"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1.5">
          Care Instructions{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <Input
          {...register("careInstructions")}
          placeholder="e.g. Machine wash cold"
          className="rounded-2xl"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSubmitting} className="rounded-2xl">
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="rounded-2xl"
          render={<Link href="/admin/products" />}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
