"use client";

import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { uploadProfilePicture } from "@/firebase/storage";
import { updateClient } from "@/lib/clients-actions";
import { updateLawyer } from "@/lib/lawyers-actions";
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
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleProfilePictureChange(target: HTMLInputElement) {
    const image = target.files?.[0];
    if (!image) return;

    try {
      const imageUrl = await uploadProfilePicture(userId, image);
      setAvatarUrl(imageUrl);

      if (lawyerId) {
        await updateLawyer(lawyerId, { profilePicture: imageUrl });
      } else if (clientId) {
        await updateClient(clientId, { profilePicture: imageUrl });
      }

      toast({ description: "La foto se guardó correctamente." });
    } catch (error) {
      console.error("handleProfilePictureChange error:", error);
      toast({
        variant: "destructive",
        title: "¡Oh no! Algo falló.",
        description: "No se pudo guardar la foto. Por favor, intentá de nuevo.",
      });
    }
  }

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        id="upload-image"
        className="hidden"
        onChange={(e) => handleProfilePictureChange(e.target)}
      />
      <Avatar
        onClick={() => fileInputRef.current?.click()}
        className="h-24 w-24 cursor-pointer transition-opacity hover:opacity-80"
      >
        <AvatarImage
          src={avatarUrl}
          alt={`${firstName ?? ""} ${lastName ?? ""}`}
        />
        <AvatarFallback>Sin foto</AvatarFallback>
      </Avatar>
    </div>
  );
}
