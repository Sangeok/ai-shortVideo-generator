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
2.
