'use client'
import React from "react"
import {Card, CardHeader, CardBody, Divider, Image} from "@nextui-org/react"
import { IProject } from "@/services/notion/types"
// import NextImage from "next/image"
import {Link} from '@/components/ui'

export default function ProjectsPanel({projects}:{projects:IProject[]}) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
      {projects.map((project) => (
        <Card className="py-4 flex-auto  max-w-sm"  key={project.id}>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
         <div className="w-full flex justify-between">
          <p className="font-bold text-lg">{project.name}</p>
           {project.github?
                  (<Link
                      className="text-sm opacity-80"
                      isExternal
                      href={project.github}
                    >
                    GitHub Repo
                  </Link>):
                  (
                    <div className="text-sm text-slate-500">未开源</div>
                  )
                }
         </div>
        <p className="text-sm text-default-500">{project.intro}</p>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={project.cover}
        />
      </CardBody>
    </Card>
          //   <Card shadow={'sm'} className="mb-4 w-full" key={project.id}>
          //     <CardHeader className="flex gap-3">
          //       {/* <Image
          //         height={40}
          //         as={NextImage}
          //         radius="sm"
          //         src={project.cover}
          //         width={40}
          //         className="object-cover w-10 h-10"
          //         alt="project icon"
          //       /> */}
          //       <div className="flex flex-col">
          //         <p className="text-lg">{project.name}</p>
          //         {project.github?
          //         (<Link
          //             className="text-sm opacity-80"
          //             isExternal
          //             href={project.github}
          //           >
          //           GitHub Repo
          //         </Link>):
          //         (
          //           <div className="text-sm text-slate-500">未开源</div>
          //         )
          //       }
          //       </div>
          //     </CardHeader>
          //   <Divider/>
          //   <CardBody>
          //     <p className="text-sm text-slate-500">{project.intro}</p>
          //   </CardBody>
          // </Card>
      ))}
    </div>
  )
}
