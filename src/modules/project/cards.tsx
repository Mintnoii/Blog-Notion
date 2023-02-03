'use client'
import React from "react"
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react"
import { IProject } from "@/services/notion/types"
// import NextImage from "next/image"
import { Link } from '@/components/ui'

export default function ProjectCards({ projects }: { projects: IProject[] }) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
      {projects.map((project) => (
        <Card className="flex-auto max-w-sm relative" radius="sm" key={project.id}>
          <CardHeader className="p-0">
            <Image
              removeWrapper
              alt="project cover"
              className="w-full h-36 object-cover rounded-sm"
              src={project.cover_url}
            />
          </CardHeader>
          <CardBody>
            <div className="w-full mb-1 flex justify-between">
              <p className="font-bold text-lg">{project.name}</p>
              {project.github ?
                (<Link
                  className="text-sm text-blue-400 opacity-80"
                  isExternal
                  href={project.github}
                >
                  GitHub
                </Link>) :
                (
                  <div className="text-sm text-default-500">未开源</div>
                )
              }
            </div>
            <p className="text-[13px] text-default-500">{project.intro}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
