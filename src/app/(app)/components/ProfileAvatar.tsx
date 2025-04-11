"use client";

import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import clsx from "clsx";
import Compressor from "compressorjs";
import { Loader2 } from "lucide-react";
import { uploadProfilePicture } from "@/firebase/storage";
import { updateClient } from "@/lib/clients-actions";
import { updateLawyer } from "@/lib/lawyers-actions";
import { updateUser } from "@/lib/users-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileAvatarProps {
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
  lawyerId?: string;
  clientId?: string;
  userId: string;
}

export default function ProfileAvatar({
  profilePicture,
  firstName,
  lastName,
  lawyerId,
  clientId,
  userId,
}: ProfileAvatarProps) {
  const [avatarUrl, setAvatarUrl] = useState(profilePicture ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleProfilePictureChange(target: HTMLInputElement) {
    const image = target.files?.[0];
    if (!image) return;

    setIsUploading(true);

    new Compressor(image, {
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 800,
      convertTypes: ["image/webp"],
      convertSize: 1000000,
      success: async (compressedImage: File) => {
        try {
          const imageUrl = await uploadProfilePicture(userId, compressedImage);
          setAvatarUrl(imageUrl);

          if (lawyerId) {
            await updateLawyer(lawyerId, { profilePicture: imageUrl });
            await updateUser(userId, { photoURL: imageUrl });
          } else if (clientId) {
            await updateClient(clientId, { profilePicture: imageUrl });
            await updateUser(userId, { photoURL: imageUrl });
          }

          toast({ description: "La foto se guardó correctamente." });
        } catch (error) {
          console.error("handleProfilePictureChange error:", error);
          toast({
            variant: "destructive",
            title: "¡Oh no! Algo falló.",
            description:
              "No se pudo guardar la foto. Por favor, intentá de nuevo.",
          });
        } finally {
          setIsUploading(false);
        }
      },
      error(err: Error) {
        console.error("Compressor error:", err);
        toast({
          variant: "destructive",
          title: "¡Oh no! Algo falló.",
          description:
            "No se pudo guardar la foto. Por favor, intentá de nuevo.",
        });
        setIsUploading(false);
      },
    });
  }

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        id="upload-image"
        className="hidden"
        disabled={isUploading}
        onChange={(e) => handleProfilePictureChange(e.target)}
      />
      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className="relative"
      >
        <Avatar
          className={clsx(
            "h-24 w-24 cursor-pointer transition-opacity hover:opacity-80",
            isUploading && "opacity-50 pointer-events-none"
          )}
        >
          <AvatarImage
            src={avatarUrl}
            alt={`${firstName ?? ""} ${lastName ?? ""}`}
          />
          <AvatarFallback>Sin foto</AvatarFallback>
        </Avatar>

        {isUploading && (
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
            <Loader2 className="h-6 w-6 text-white animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
