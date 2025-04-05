"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { uploadFile } from "@/firebase/storage";
import { updateLawyer } from "@/lib/lawyers-actions";
import { useToast } from "@/hooks/use-toast";
import { updateClient } from "@/lib/clients-actions";

interface ProfileAvatarProps {
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
  lawyerId?: string;
  clientId?: string;
}

export default function ProfileAvatar({
  profilePicture,
  firstName,
  lastName,
  lawyerId,
  clientId,
}: ProfileAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState(profilePicture ?? "");
  const { toast } = useToast();

  function handleAvatarClick() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadFile(file);
      setAvatarUrl(url);
      if (lawyerId) {
        await updateLawyer(lawyerId, {
          profilePicture: url,
        });
      } else if (clientId) {
        await updateClient(clientId, {
          profilePicture: url,
        });
      }
      toast({
        description: "La foto se guardó correctamente.",
      });
    } catch (error) {
      console.error("HandleFileChange error:", error);
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
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <Avatar
        className="h-24 w-24 cursor-pointer transition-opacity hover:opacity-80"
        onClick={handleAvatarClick}
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
