import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as z from "zod";
import { Product } from "../../interfaces/Product";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../contexts/ProductContext";

const productSchema = z.object({
  title: z.string().min(6),
  price: z.number().min(0),
  description: z.string().optional(),
  thumbnail: z.string().url().optional(), // Validate thumbnail as URL
});

const ProductForm = () => {
  const { id } = useParams();
  const { onSubmitProduct, getDetail, state } = useContext(ProductContext);
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null); // State to hold the thumbnail preview

  useEffect(() => {
    if (id) {
      (async () => {
        getDetail(id);
        reset(state.seletedProduct);
      })();
    }
  }, [id, getDetail, reset, state.seletedProduct]);

  // Handle thumbnail input change to display preview
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const thumbnailUrl = e.target.value;
    setThumbnailPreview(thumbnailUrl); // Set the URL as thumbnail preview
  };

  return (
    <div>
      <form onSubmit={handleSubmit((data) => onSubmitProduct({ ...data, id }))}>
        <h1>{id ? "Update product" : "Add product"}</h1>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-danger">{errors.title.message}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price && (
            <span className="text-danger">{errors.price.message}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            {...register("description")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">
            Thumbnail (Image URL)
          </label>
          <input
            type="text"
            className="form-control"
            {...register("thumbnail")}
            onChange={handleThumbnailChange}
          />
          {errors.thumbnail && (
            <span className="text-danger">{errors.thumbnail.message}</span>
          )}
        </div>

        {/* Thumbnail Preview */}
        {thumbnailPreview && (
          <div className="mb-3">
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "200px",
                objectFit: "contain",
              }}
            />
          </div>
        )}

        <div className="mb-3">
          <button className="btn btn-primary">
            {id ? "Update product" : "Add product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
