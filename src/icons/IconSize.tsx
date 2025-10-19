// iconSize.ts
export type Size = "sm" | "md" | "lg";

export interface SizeStyles {
    size: Size,
    open?: boolean
    contentId?: string;
    onClose?: () => void;
    onClick?: () => void;
}

export const sizeClasses: Record<Size, string> = {
    sm: "w-5 h-5 ", // You can customize width/height or padding
    md: "w-6 h-6 ",
    lg: "w-8 h-8 ",
};
