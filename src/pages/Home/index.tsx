import { Pause, Play } from 'phosphor-react'
import { CountDown } from './components/CountDown'
import { NewCycleForm } from './components/NewCycleForm'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import * as zod from 'zod'

import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CycleContext'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa.'),
  minutesAmount: zod
    .number()
    .min(5, 'O intervalo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O intervalo precisa ser menor ou igual a 60 minutos.'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const taskInput = watch('task')
  const isButtonDisabled = taskInput

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <CountDown />

        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <Pause size={26} /> Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={!isButtonDisabled} type="submit">
            <Play size={26} /> Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
