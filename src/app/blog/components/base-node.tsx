import { memo } from "react";
import {
    BaseNode,
    BaseNodeContent,
    BaseNodeFooter,
    BaseNodeHeader,
    BaseNodeHeaderTitle,
} from "@/components/react-flow/BaseNode";
import { Rocket } from "lucide-react";

export  const BaseNodeFull = memo(() => {
    return (
        <BaseNode className="w-96">
            <BaseNodeHeader className="border-b">
                <Rocket className="size-4" />
                <BaseNodeHeaderTitle>Header</BaseNodeHeaderTitle>
            </BaseNodeHeader>
            <BaseNodeContent>
                <h3 className="text-lg font-bold">Content</h3>
                <p className="text-xs">
                    This is a full-featured node with a header, content, and footer. You
                    can customize it as needed.
                </p>
            </BaseNodeContent>
            <BaseNodeFooter>
                <h4 className="text-md self-start font-bold">Footer</h4>


            </BaseNodeFooter>
        </BaseNode>
    );
});

BaseNodeFull.displayName = "BaseNodeFullDemo";