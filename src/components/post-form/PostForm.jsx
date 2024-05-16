import React, { useCallback, useEffect } from "react";
import Button from "../Button";
import service from "../../appwrite/conf";
import Select from "../Select";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post.title || "",
        content: post?.content || "",
        slug: post?.slug || "",
        status: post?.status || "",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = (await data.image[0])
        ? service.uploadFile(data.image[0])
        : null;

      if (file) {
        service.deleteFile(post.image);
      }
      const dbpost = service.updatePost(post?.$id, {
        ...data,
        images: file ? file?.$id : undefined,
      });

      if (dbpost) {
        navigate(`post/${dbpost.$id}`);
      }
    } else {
      const file = await service.uploadFile(data.image[0]);

      if (file) {
        const fileId = file?.$id;
        data.images = fileId;

        const dbpost = await service.createPost({
          ...data,
          // userid: userData?.$id,
        });

        if (dbpost) {
          navigate(`/post/${dbpost?.$id}`);
        }
      }
    }
  };

  const slugTransfer = useCallback((value) => {
    if (value && typeof value == "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-");

    return "";
  }, []);

  useEffect(()=>{
    const subscription=watch((value,{name})=>{
        if(name=="title"){
            setValue('slug', slugTransfer(value?.title,{shouldValidate:true}))
        }
    })

    return ()=>{
        subscription.unsubscribe()
    }
  },[watch,setValue,slugTransfer])
  return   <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
  <div className="w-2/3 px-2">
      <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
      />
      <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
      />
      <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
  </div>
  <div className="w-1/3 px-2">
      <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
      />
      {post && (
          <div className="w-full mb-4">
              <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg"
              />
          </div>
      )}
      <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
      />
      <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
          {post ? "Update" : "Submit"}
      </Button>
  </div>
</form>;
}

export default PostForm;
