import { Card, CardContent } from "@/components/ui/card";

const skills = [
  { name: "React", level: "Advanced" },
  { name: "Next.js", level: "Advanced" },
  { name: "TypeScript", level: "Intermediate" },
  { name: "Tailwind CSS", level: "Advanced" },
  { name: "Firebase", level: "Intermediate" },
  { name: "Shadcn UI", level: "Advanced" },
  { name: "Node.js", level: "Intermediate" },
  { name: "Git & GitHub", level: "Advanced" },
];

export function Skills() {
  return (
    <section id="skills" className="py-24 relative mt-4 ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical Arsenal
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Technologies I use to build scalable and performant applications.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {skills.map((skill) => (
            <Card
              key={skill.name}
              className="group relative overflow-hidden transition-all duration-300 hover:border-primary/50 bg-card/50 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardContent className="flex flex-col items-center justify-center p-6 gap-2 relative z-10">
                <span className="text-lg font-semibold group-hover:text-primary transition-colors">
                  {skill.name}
                </span>
                <span className="text-xs text-muted-foreground group-hover:text-primary/70">
                  {skill.level}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
