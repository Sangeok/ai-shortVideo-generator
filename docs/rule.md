# 아키텍처

- FSD(Feature-Sliced Design)

## FSD Rule

FSD의 경우 세부적으로 들어갔을 때, 명확한 규칙이 없으므로 이곳에 이 프로젝트를 위한 간단한 규칙을 명시한다.
(기본적으로 FSD를 따르나, 필요한 경우 현재 프로젝트에 맞게 커스터마이징 한다.)

### pages, widgets, Features, entities, Shared

FSD에서 기본적인 이 틀을 가장 기본적으로 사용한다.

#### pages

명시된 바와 같이 page를 나타내는 component들을 나타낸다.
단, 현재 프로젝트는 Nextjs의 app route 방식을 사용하므로 이를 고려하여 실제 app route에 사용되는 server component에 pages에 있는 component를 넣어서 사용하면 됨.

#### widgets

특정 pages 표현할 수 있도록 나눠진 UI들의 모임.
Widgets 레이어는 페이지 내에서 독립적으로 작동하는 큰 기능 단위를 포함하는 레이어이다.
이 레이어는 독립적으로 기능하는 큰 규모의 UI 컴포넌트나 기능 블록을 구성하여 다양한 페이지에서 재사용할 수 있으나, 이 프로젝트에서는 재사용까진 고려하지 않음.

#### features

Features 레이어는 재사용 가능한 비즈니스 기능을 위한 레이어로, 독립적으로 동작할 수 있는 하나의 특정 동작을 정의한다.

#### entities

Entities는 비즈니스 엔티티(도메인 객체)를 관리하여야 한다.

#### shared

1. 전역변수는 shared의 store 내부에서 관리한다.
2. shared의 ui는 atom, molecule 폴더를 가진다. (atom은 완전 순수한 ui component, molecule은 atom을 기반으로 만들어진 재사용 가능한 ui component)
3. 기타 전역적으로 사용될 utils나 lib 및 types는 shared에서 정의한다.

##### 각 layer에 들어갈 수 있는 요소들

1. ui
   말 그대로 ui를 표현하기 위한 component들의 모임.
   순수한 ui를 나타내면 좋겠지만, 간단한 state도 여기서 만들어줌.

1.1 [main].tsx(ex Explnation/VideoExplanation.tsx)
현재 폴더의 main을 담당하는 파일.

1-2. \_component
ui component를 표현하기 위해 굉장히 지엽적인 component를 나타냄.

2. constants
   상수들을 관리하기 위한 폴더

3. lib
   지역적이고 지엽적이면서 utils보다 복잡하고 실질적인 함수들을 여기서 정의
   외부 라이브러리를 포함한 특정 함수를 만들 때 lib에 넣음.
   lib는 종종 비즈니스 로직을 구현하거나 외부 서비스를 통합
   (ex 인증 시스템, API client, data formmating)

4. utils
   lib보다 더 간단하고 일반적인 헬퍼 함수를 포함
   주로 순수 유틸리티 함수로 구성
   단일 목적에 집중된 함수가 많다.
   애플리케이션 전체에 재사용되는 코드를 포함
   헬퍼 함수를 제공합니다
   (ex 날짜 형식 지정, 문자열 조작, 유효성 검사 헬퍼, 간단한 계산기)

5. model

4-1. hooks
api 호출 및 그와 관련된 상태 관리를 여기서 관리.

5. test
   말 그대로 test를 위함.
   해당 폴더 내부에 있는 파일의 test를 전체적으로 관리.
