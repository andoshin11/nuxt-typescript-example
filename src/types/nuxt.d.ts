import Vue from 'vue'
import { Store, ActionTree, ActionContext } from 'vuex'
import VueRouter, { Route } from 'vue-router'
import { RootState } from '@/store'
import { RequestOptions, ServerResponse } from 'http'

type Dictionary<T> = { [key: string]: T }

export interface ApplicationContext {
  app: Vue
  isClient: boolean
  isServer: boolean
  isStatic: boolean
  isDev: Boolean
  isHMR: Boolean
  route: Route
  store: Store<RootState>
  env: Dictionary<any>
  params?: Route['params']
  query: Route['query']
  req: RequestOptions
  res: ServerResponse
  redirect: (path: string, query?: Route['query']) => void
  error: (params: { statusCode: number; message: string }) => void
  nuxtState: RootState
  beforeNuxtRender: (
    fn: (
      params: {
        Components: VueRouter['getMatchedComponents']
        nuxtState: RootState
      }
    ) => void
  ) => void
}

declare module 'vuex/types/index' {
  interface ActionTree<S, R> {
    nuxtServerInit: (
      context: ActionContext<S, R>,
      nuxtContext: ApplicationContext
    ) => void
  }
}

declare module 'vue/types/options' {
  interface Transition {
    name?: string
    mode?: 'in-out' | 'out-in'
    type?: 'transition' | 'animation'
    css?: boolean
    duration?: number
    enterClass?: string
    enterToClass?: string
    enterActiveClass?: string
    leaveClass?: string
    leaveToClass?: string
    leaveActiveClass?: string
    beforeEnter?(el: HTMLElement): void
    enter?(el: HTMLElement, done: Function): void
    afterEnter?(el: HTMLElement): void
    enterCancelled?(el: HTMLElement): void
    beforeLeave?(el: HTMLElement): void
    leave?(el: HTMLElement, done: Function): void
    afterLeave?(el: HTMLElement): void
    leaveCancelled?(el: HTMLElement): void
  }

  interface ComponentOptions<V extends Vue> {
    head?: any
    watchQuery?: string[]
    layout?: string | ((context: ApplicationContext) => string)
    fetch?: (context: ApplicationContext) => Promise<void>
    asyncData?: (context: ApplicationContext) => Promise<any> | undefined
    transition?: string | Transition | ((to: any, from: any) => string)
    scrollToTop?: boolean
    validate?: (context: ApplicationContext) => Promise<boolean> | boolean
    middleware?: string | string[]
  }
}
