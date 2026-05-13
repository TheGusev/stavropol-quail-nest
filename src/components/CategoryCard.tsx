import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export type CategoryRoute =
  | "/yaytsa"
  | "/perepelinye-yaytsa"
  | "/inkubatsionnoe-yaytso"
  | "/ptitsa"
  | "/ptitsa/sutochnye"
  | "/ptitsa/podroshchennye"
  | "/ptitsa/nesushki"
  | "/ptitsa/samtsy"
  | "/ptitsa/roditelskoe-stado"
  | "/molodnyak"
  | "/myaso"
  | "/myaso-perepela"
  | "/myaso/zamorozhennoe"
  | "/myaso/dlya-zapekaniya"
  | "/myaso/marinovannye-kopchenye"
  | "/myaso/marinovannye-yaytsa"
  | "/myaso/vybrakovannye"
  | "/soputstvuyushchie"
  | "/soputstvuyushchie/pomet"
  | "/soputstvuyushchie/potroha"
  | "/soputstvuyushchie/skorlupa"
  | "/soputstvuyushchie/pero-pukh"
  | "/kletki";

export interface CategoryCardProps {
  to: CategoryRoute;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export function CategoryCard({ to, title, description, image, imageAlt }: CategoryCardProps) {
  return (
    <Link
      to={to}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl font-semibold">{title}</h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{description}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
          Подробнее <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
