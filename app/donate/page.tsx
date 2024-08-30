import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DonatePage() {
    return (
        <div className={"h-full w-full flex items-center justify-center"}>
            <Card>
                <CardHeader>
                    <CardTitle>Donate</CardTitle>
                    <CardDescription>
                        If you enjoy using the Blog Builder, help keep us alive by donating. This
                        will help with the costs of deployment.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button>Apple Pay</Button>
                </CardContent>
            </Card>
        </div>
    );
}
