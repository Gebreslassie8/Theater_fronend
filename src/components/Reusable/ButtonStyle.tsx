// src/components/Reusable/ButtonStyle.ts
import Colors from "./Colors";

interface ButtonStyle {
    base: string;
    color: string;
    backgroundColor: string;
    hoverBackgroundColor: string;
    borderColor: string;
}

const ButtonStyle: ButtonStyle = {
    base: "h-[46px] text-base font-normal rounded-2xl flex justify-center items-center cursor-pointer mt-2",
    color: Colors.white,
    backgroundColor: Colors.deepTeal,
    hoverBackgroundColor: Colors.skyTeal,
    borderColor: Colors.red
};

export default ButtonStyle;